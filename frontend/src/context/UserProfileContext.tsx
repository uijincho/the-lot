// Backward-compat shim — delegates to AuthContext.
// Components that import useProfile() continue working unchanged.
export { useAuth as useProfile } from './AuthContext'
export { AuthProvider as UserProfileProvider } from './AuthContext'
