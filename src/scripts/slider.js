const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
let currentIndex = 1;

// Function to update the active dot
export const updateDots = () => {
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
};

const changeSlide = ()=>{
    slides.forEach((slide, idx)=>{
        
    })
}

// Add click event to dots
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateDots();
  });
});


