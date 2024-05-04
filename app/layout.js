import "./style.css";
export const metadata = {
  title: "List Of coins by DOGUNFX",
  description: "A simple Page to list crypto currency coins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
