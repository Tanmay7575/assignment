

const Footer=() => {
  return (
    <footer className="bg-gray-400 text-center py-4 mt-auto shadow-inner">
      <p className="text-sm text-gray-600">
        &copy; {new Date().getFullYear()} My App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
