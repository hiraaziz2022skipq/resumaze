import "react-perfect-scrollbar/dist/css/styles.css";

// Style Imports
import "@/app/globals.css";

// Generated Icon CSS Imports
import "@assets/iconify-icons/generated-icons.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Resumaze",
  description: "resumaze",
};

const RootLayout = ({ children }) => {
  // Vars
  const direction = "ltr";

  return (
    <html id="__next" lang="en" dir={direction}>
      <Providers direction="ltr">
        <body className="flex is-full min-bs-full flex-auto flex-col">
          {children}
        </body>
      </Providers>
    </html>
  );
};

export default RootLayout;
