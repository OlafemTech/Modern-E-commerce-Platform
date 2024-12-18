import './globals.css'

export const metadata = {
  title: 'Honest E-commerce',
  description: 'Modern fashion e-commerce platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
