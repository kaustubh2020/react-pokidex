const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 px-3 py-1 bg-stone-500 text-white rounded-full shadow-lg hover:bg-stone-600 transition duration-200"
        aria-label="Scroll to top"
      >
        Scroll to ⬆️
      </button>
    </>
  );
};

export default ScrollToTopButton;
