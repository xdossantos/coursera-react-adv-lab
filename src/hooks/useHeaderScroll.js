import { useState, useEffect } from 'react';

const useHeaderScroll = (headerRef) => {
  const [scrollY, setScrollY] = useState(0);

  /**
   * Creates a function that smoothly scrolls the window to the top of the element with the id `${anchor}-section`.
   * If the current scroll position is greater than the element's offsetTop, it will scroll to 70 pixels above the element.
   * @param {string} anchor - The anchor for which to create the scroll function.
   * @returns {function} A function that scrolls the window to the top of the element with the id `${anchor}-section`.
   */
  const handleClick = anchor => () => {
    const el = document.getElementById(`${anchor}-section`);
    if (el) window.scrollTo({ top: el.offsetTop - (scrollY > el.offsetTop ? 70 : 0), behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current;
      setScrollY((prevScrollY) => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > prevScrollY) {
          // ? scrolling down
          header.style.transform = "translateY(-100%)";
          return currentScrollY;
        }
        // ? scrolling up
        header.style.transform = "translateY(0)";
        return currentScrollY;
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return handleClick;
};

export default useHeaderScroll;