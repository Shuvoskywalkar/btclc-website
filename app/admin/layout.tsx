import { AuthProvider } from '@/lib/auth-context'

export const metadata = {
  title: 'Admin | BTCLC',
  description: 'BTCLC Admin Panel - Manage website content',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthProvider>{children}</AuthProvider>
}
