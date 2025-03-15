import "./globals.css";

export const metadata = {
  title: "Weatherly",
  description: "Built by Gregory Robertson",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
