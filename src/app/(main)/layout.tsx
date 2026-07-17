import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSessionUser } from "@/app/auth/_actions/auth";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSessionUser();

  return (
    <>
      <Header user={user} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

