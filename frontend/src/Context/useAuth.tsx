import axios from 'axios'
import React from 'react'
import { createContext, useState, ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
    user: UserProfile | null
    setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
    loginUser: (username: string, password: string) => Promise<void>
    RegisterUser: (username: string, password: string, email: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'))
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
      if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
  
      const fetchUser = async () => {
          try {
              const userData = await axios.get('/api/usuarios/me')
              setUser(userData.data)
          } catch (error) {
              console.error('Erro ao buscar usuário:', error)
              logout()
          }finally {
            setLoading(false);
          }
      }
  
      if (token) {
        fetchUser();
      } else {
        setLoading(false);
      }
  
      const interval = setInterval(async () => {
        if (token) {
          try {
            const response = await axios.post('/api/token/refresh/', {
              refresh: localStorage.getItem('refresh_token'),
            })
            const { access } = response.data
            localStorage.setItem('access_token', access)
            setToken(access)
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            await fetchUser()
          } catch (error) {
            console.error('Falha ao atualizar o token:', error)
            logout()
          }
        }
      }, 60 * 60 * 1000)
    
      return () => clearInterval(interval)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token])

    if (loading) {
      return <div>Carregando...</div>;
    }

    const RegisterUser = async (username: string, email: string, password: string) => {
      try {
            const data = {
              username: username,
              email: email,
              password: password,
            }
            await axios.post('/api/usuarios/', data)
            navigate('/login')
        } catch (error) {
            console.error('Erro no registro:', error)
        }
    }
  

    const loginUser = async (username: string, password: string) => {
        try {
            const response = await axios.post('/api/token/', { username, password })

            const { access, refresh } = response.data
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`
            localStorage.setItem('access_token', access)
            localStorage.setItem('refresh_token', refresh)
            setToken(access)

            const userData = await axios.get('/api/usuarios/me')
            setUser(userData.data)

            navigate('/')
          } catch (error) {
            console.error('Erro no login:', error)
          }
    };

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ user, setUser, RegisterUser, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider')
    }
    return context
}
