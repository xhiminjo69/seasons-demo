document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenu = document.getElementById("mobile-menu")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      navMenu.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Menu Tabs
  const menuTabs = document.querySelectorAll(".menu-tab")
  const menuCategories = document.querySelectorAll(".menu-category")

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      menuTabs.forEach((t) => t.classList.remove("active"))
      // Add active class to clicked tab
      tab.classList.add("active")

      // Hide all menu categories
      menuCategories.forEach((category) => {
        category.classList.remove("active")
      })

      // Show the selected category
      const targetCategory = document.getElementById(tab.dataset.target)
      if (targetCategory) {
        targetCategory.classList.add("active")
      }
    })
  })

  // Form Submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      // Here you would typically send the data to a server
      // For now, we'll just log it and show an alert
      console.log("Form submitted:", { name, email, message })

      // Show success message (in a real app, you'd do this after successful submission)
      alert("Thank you for your message! We will get back to you soon.")

      // Reset form
      contactForm.reset()
    })
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get email value
      const email = newsletterForm.querySelector('input[type="email"]').value

      // Here you would typically send the data to a server
      console.log("Newsletter subscription:", email)

      // Show success message
      alert("Thank you for subscribing to our newsletter!")

      // Reset form
      newsletterForm.reset()
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Get the header height to offset the scroll position
        const headerHeight = document.querySelector("header").offsetHeight

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        })
      }
    })
  })

  // Image loading for gallery
  // This is where you would replace the placeholder images with your actual images
  // For now, we'll just log a message
  console.log("Ready to load your 5 images into the gallery!")

  // Featured Cocktail Rotation
  const featuredCocktails = [
    {
      name: "Tropical Sunset",
      description: "Rum, pineapple juice, orange juice, grenadine",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Foto%20Ekstra1.jpg-PZLQArc46NEY11GRovEw0PHoIeFTHO.jpeg",
    },
    {
      name: "Classic Martini",
      description: "Gin, dry vermouth, olive or lemon twist",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Craft%20Cocktails.jpg-DN1lR2hEGHA8HCceg9dBqcId8x8nK8.jpeg",
    },
    {
      name: "Seasons Special",
      description: "Our signature blend of premium spirits and fresh ingredients",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Craft%20Cocktails.jpg-DN1lR2hEGHA8HCceg9dBqcId8x8nK8.jpeg",
    },
  ]

  let currentCocktail = 0
  const featuredCocktailElement = document.getElementById("featured-cocktail")

  if (featuredCocktailElement) {
    setInterval(() => {
      currentCocktail = (currentCocktail + 1) % featuredCocktails.length
      const cocktail = featuredCocktails[currentCocktail]

      featuredCocktailElement.querySelector("img").src = cocktail.image
      featuredCocktailElement.querySelector("h3").textContent = cocktail.name
      featuredCocktailElement.querySelector("p").textContent = cocktail.description

      // Add fade effect
      featuredCocktailElement.classList.add("fade")
      setTimeout(() => {
        featuredCocktailElement.classList.remove("fade")
      }, 500)
    }, 5000)
  }

  // Testimonial Rotation
  const testimonials = [
    {
      text: "Nice and modern bar at the main street. Friendly and helpful staff. Great coffee and drinks for reasonable prices.",
      author: "TripAdvisor Reviewer",
    },
    {
      text: "Beautiful sea view and amazing cocktails. The staff is very professional and friendly.",
      author: "Google Reviewer",
    },
    {
      text: "Perfect spot for both morning coffee and evening drinks. Love the atmosphere!",
      author: "Local Customer",
    },
  ]

  let currentTestimonial = 0
  const testimonialElement = document.getElementById("testimonial")

  if (testimonialElement) {
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      const testimonial = testimonials[currentTestimonial]

      testimonialElement.querySelector(".testimonial-text").textContent = testimonial.text
      testimonialElement.querySelector(".testimonial-author").textContent = testimonial.author

      // Add fade effect
      testimonialElement.classList.add("fade")
      setTimeout(() => {
        testimonialElement.classList.remove("fade")
      }, 500)
    }, 7000)
  }
})

