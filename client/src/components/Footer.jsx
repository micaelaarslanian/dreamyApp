
function Footer() {
  const year = new Date().getFullYear();

  {/* Footer component displaying copyright information. footer is on the bottom of the page always */ }
  return (

    <footer className="bg-[#557791] text-white text-center py-4 mt-10 fixed bottom-0 w-full">
      <p className="text-sm">
        &copy; {year} Somnia. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
