
var app = angular.module("myApp", ["ngRoute"]);
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/sunflora/pages/home.html",
            controller: "HomeController"
        })
        .when("/product", {
            templateUrl: "/sunflora/pages/product.html",
            controller: "ProductController"
        })
        .when("/login", {
            templateUrl: "/sunflora/pages/login.html",
            controller: "LoginController"
        })
        .when("/register", {
            templateUrl: "/sunflora/pages/registration.html",
            controller: "RegistrationController"
        })
        .otherwise({
            redirectTo: "/"
        });
}]);

app.service("CountService", function () {
    let likePlant = [];
    return {
        getCount: function () {
            return likePlant;
        },
        incrementCount: function (plant) {
            if (!likePlant.some(item => item.id === plant.id)) {
                likePlant.push(plant);
              }
        }
    };
});

app.controller("HomeController", ["$scope", function ($scope) {
  const slidesContainer = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const bullets = document.querySelectorAll('.bullet'); 
  const media = window.matchMedia("(min-width:768px)");
  let currentIndex = 1;
  let midslide = slidesContainer.children[1];

   const updateSlide = ()=>{
    handleMediaQueryChange(media);
    bullets.forEach((bullet,idx)=>{
       bullet.classList.toggle('bg-red-500', currentIndex === idx);
   });
  } 

  const handleSlideDesktop = ()=>{
    slidesContainer.removeChild(slides[currentIndex]);
    slidesContainer.prepend(slides[currentIndex]);
    let newmid = slidesContainer.children[1];
     midslide.children[0].classList.remove('w-72');
     newmid.children[0].classList.add('w-72');
     midslide = newmid;
  }

 const handleSlideMObile = (slides)=>{
  slides.forEach((slide)=>{
    slide.style.transform = `translateX(${-currentIndex*100}%)`
  })
 }
   const handleBulletClick = ()=>{
   bullets.forEach((bullet,idx)=>{
       bullet.addEventListener('click', ()=>{
           currentIndex = idx;
           updateSlide();
       })
   })
  }

  function handleMediaQueryChange(e){
    if(e.matches){
      slides.forEach((slide)=>{
        slide.style.transform = `translateX(0)`;
      })
      handleSlideDesktop();
    } else{
      handleSlideMObile(slides);
    }
  }

  handleBulletClick();
  updateSlide();


  media.addEventListener("change", handleMediaQueryChange);

      $scope.$on("$viewContentLoaded", function () {
        const navbar = document.getElementById("header");

        angular.element(window).on("scroll", function () {
            if (window.scrollY > 100) {
                navbar.classList.add("shadow-lg", "bg-clr_accent_800");
            } else {
                navbar.classList.remove("shadow-lg", "bg-clr_accent_800");
            }
        });
    });

    // Remove event listener when scope is destroyed (prevents memory leaks)
    $scope.$on("$destroy", function () {
        angular.element(window).off("scroll");
    });


    
}]);

app.controller("ProductController", ["$scope","CountService", function ($scope, CountService) {
    $scope.$on("$viewContentLoaded", function () {
        navbar = document.getElementById("header");
            navbar.classList.add("shadow-lg", "bg-clr_accent_800");
    });

    $scope.plants = [
        {
          id: 1,
          name: "Aloe Vera",
          price: 299,
          desc: "A medicinal succulent known for its healing properties and low maintenance.",
          url: "/sunflora/upload/img1.webp"
        },
        {
          id: 2,
          name: "Snake Plant",
          price: 499,
          desc: "An air-purifying indoor plant that thrives in low light and requires minimal care.",
          url: "/sunflora/upload/img2.jpeg"
        },
        {
          id: 3,
          name: "Peace Lily",
          price: 399,
          desc: "A beautiful flowering plant that purifies air and adds elegance to any space.",
          url: "/sunflora/upload/img3.jpeg"
        },
        {
          id: 4,
          name: "Spider Plant",
          price: 349,
          desc: "An easy-to-grow plant that improves air quality and is pet-friendly.",
          url: "/sunflora/upload/img4.webp"
        },
        {
          id: 5,
          name: "Money Plant",
          price: 299,
          desc: "A lucky plant believed to bring prosperity and good fortune.",
          url: "/sunflora/upload/img5.jpg"
        },
        {
          id: 6,
          name: "Bamboo",
          price: 599,
          desc: "A low-maintenance plant symbolizing luck and positive energy.",
          url: "/sunflora/upload/img6.webp"
        },
        {
          id: 7,
          name: "Jade Plant",
          price: 449,
          desc: "A succulent that requires little water and is said to bring wealth and success.",
          url: "/sunflora/upload/img7.webp"
        },
        
        {
          id: 8,
          name: "Tulsi (Holy Basil)",
          price: 199,
          desc: "A sacred plant in Indian culture, known for its medicinal and spiritual benefits.",
          url: "/sunflora/upload/img9.jpg"
        }
      ];

    $scope.likeCount = CountService.getCount();

    $scope.handleLikeCount = function (plant) {
        CountService.incrementCount(plant);
        $scope.likeCount = CountService.getCount(); // Update UI
    };
   

    $scope.handleLike = (id)=>{
        const heart = document.getElementById(id);
        heart.classList.toggle('text-red-500');
    }


    // Cleanup when the controller is destroyed
    $scope.$on("$destroy", function () {
            navbar.classList.remove("shadow-lg", "bg-clr_accent_800");
    });
}]);

app.controller("LoginController", ["$scope", function ($scope) {
    $scope.$on("$viewContentLoaded", function () {
        navbar = document.getElementById("header");
        navbar.classList.add("shadow-lg", "bg-clr_accent_800");
    });

    // Cleanup when the controller is destroyed
    $scope.$on("$destroy", function () {
            navbar.classList.remove("shadow-lg", "bg-clr_accent_800");
    });
}]);

app.controller("RegistrationController", ["$scope", function ($scope) {
    $scope.$on("$viewContentLoaded", function () {
        navbar = document.getElementById("header");
        navbar.classList.add("shadow-lg", "bg-clr_accent_800");
    });

    // Cleanup when the controller is destroyed
    $scope.$on("$destroy", function () {
            navbar.classList.remove("shadow-lg", "bg-clr_accent_800");
    });
}]);



app.controller("HeaderController", function ($scope, CountService) {
    $scope.likeCount = CountService.getCount();

    // Update count dynamically
    $scope.$watch(function () {
        return CountService.getCount();
    }, function (newValue) {
        $scope.likeCount = newValue;
    });
    $scope.handleLike = ()=>{
        const likebtn = document.getElementById('likebtn');
        likebtn.classList.toggle("hidden");
    }
});



  



  

