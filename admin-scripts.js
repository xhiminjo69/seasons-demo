document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  if (!localStorage.getItem("seasonsAdminLoggedIn") && !window.location.href.includes("login.html")) {
    window.location.href = "login.html"
    return
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("seasonsAdminLoggedIn")
      window.location.href = "login.html"
    })
  }

  // Navigation between sections
  const navItems = document.querySelectorAll(".admin-nav li:not(#logout-btn)")
  const sections = document.querySelectorAll(".admin-section")

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-section")

      // Update active nav item
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")

      // Show target section
      sections.forEach((section) => section.classList.remove("active"))
      document.getElementById(targetSection).classList.add("active")

      // Update header title
      document.querySelector(".admin-header-title h1").textContent = this.textContent.trim()
    })
  })

  // Quick action buttons
  const quickActionBtns = document.querySelectorAll("[data-action]")
  quickActionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetSection = this.getAttribute("data-action")

      // Update active nav item
      navItems.forEach((nav) => {
        if (nav.getAttribute("data-section") === targetSection) {
          nav.click()
        }
      })
    })
  })

  // Menu tabs functionality
  const menuTabs = document.querySelectorAll(".menu-tab")
  const menuCategories = document.querySelectorAll(".menu-category")

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const target = this.getAttribute("data-target")

      // Update active tab
      menuTabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Show target category
      menuCategories.forEach((category) => {
        if (category.id === target + "-editor") {
          category.classList.add("active")
        } else {
          category.classList.remove("active")
        }
      })
    })
  })

  // Load menu items from localStorage or use defaults
  loadMenuItems()

  // Add menu item forms
  const addCocktailForm = document.getElementById("add-cocktail-form")
  if (addCocktailForm) {
    addCocktailForm.addEventListener("submit", function (e) {
      e.preventDefault()
      addMenuItem("cocktails", {
        name: document.getElementById("cocktail-name").value,
        price: document.getElementById("cocktail-price").value,
        description: document.getElementById("cocktail-description").value,
      })
      this.reset()
    })
  }

  const addBeerForm = document.getElementById("add-beer-form")
  if (addBeerForm) {
    addBeerForm.addEventListener("submit", function (e) {
      e.preventDefault()
      addMenuItem("beers", {
        name: document.getElementById("beer-name").value,
        price: document.getElementById("beer-price").value,
        description: document.getElementById("beer-description").value,
      })
      this.reset()
    })
  }

  const addWineForm = document.getElementById("add-wine-form")
  if (addWineForm) {
    addWineForm.addEventListener("submit", function (e) {
      e.preventDefault()
      addMenuItem("wines", {
        name: document.getElementById("wine-name").value,
        price: document.getElementById("wine-price").value,
        description: document.getElementById("wine-description").value,
      })
      this.reset()
    })
  }

  const addSnackForm = document.getElementById("add-snack-form")
  if (addSnackForm) {
    addSnackForm.addEventListener("submit", function (e) {
      e.preventDefault()
      addMenuItem("snacks", {
        name: document.getElementById("snack-name").value,
        price: document.getElementById("snack-price").value,
        description: document.getElementById("snack-description").value,
      })
      this.reset()
    })
  }

  // Load gallery images
  loadGalleryImages()

  // Image preview functionality
  const imageFileInput = document.getElementById("image-file")
  const imagePreview = document.getElementById("image-preview")

  if (imageFileInput && imagePreview) {
    imageFileInput.addEventListener("change", function () {
      const file = this.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          // Clear previous preview
          imagePreview.innerHTML = ""

          // Create image element
          const img = document.createElement("img")
          img.src = e.target.result
          img.style.display = "block"
          img.style.margin = "0 auto"
          img.style.maxHeight = "200px"

          imagePreview.appendChild(img)
        }
        reader.readAsDataURL(file)
      }
    })
  }

  // Upload image form
  const uploadImageForm = document.getElementById("upload-image-form")
  if (uploadImageForm) {
    uploadImageForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const fileInput = document.getElementById("image-file")
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
          const imageData = {
            id: Date.now(),
            title: document.getElementById("image-title").value,
            description: document.getElementById("image-description").value,
            src: e.target.result,
          }

          addGalleryImage(imageData)
          uploadImageForm.reset()
          imagePreview.innerHTML = "<p>Image preview will appear here</p>"
        }

        reader.readAsDataURL(file)
      }
    })
  }

  // Business info form
  const businessInfoForm = document.getElementById("business-info-form")
  if (businessInfoForm) {
    businessInfoForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const businessInfo = {
        name: document.getElementById("business-name").value,
        address: document.getElementById("business-address").value,
        phone: document.getElementById("business-phone").value,
        email: document.getElementById("business-email").value,
        hours: document.getElementById("business-hours").value,
        about: document.getElementById("about-text").value,
      }

      localStorage.setItem("seasonsBusinessInfo", JSON.stringify(businessInfo))
      alert("Business information updated successfully!")
    })

    // Load saved business info if available
    const savedBusinessInfo = localStorage.getItem("seasonsBusinessInfo")
    if (savedBusinessInfo) {
      const businessInfo = JSON.parse(savedBusinessInfo)
      document.getElementById("business-name").value = businessInfo.name
      document.getElementById("business-address").value = businessInfo.address
      document.getElementById("business-phone").value = businessInfo.phone
      document.getElementById("business-email").value = businessInfo.email
      document.getElementById("business-hours").value = businessInfo.hours
      document.getElementById("about-text").value = businessInfo.about
    }
  }

  // Special events functionality
  loadEvents()

  const addEventForm = document.getElementById("add-event-form")
  if (addEventForm) {
    addEventForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const eventData = {
        id: Date.now(),
        title: document.getElementById("event-title").value,
        date: document.getElementById("event-date").value,
        time: document.getElementById("event-time").value,
        description: document.getElementById("event-description").value,
      }

      addEvent(eventData)
      this.reset()
    })
  }

  // Update dashboard stats
  updateDashboardStats()
})

// Menu Items Functions
function loadMenuItems() {
  const categories = ["cocktails", "beers", "wines", "snacks"]

  categories.forEach((category) => {
    const items =
      JSON.parse(localStorage.getItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`)) ||
      getDefaultMenuItems(category)

    const listElement = document.getElementById(`${category}-list`)
    if (listElement) {
      listElement.innerHTML = ""

      if (items.length === 0) {
        listElement.innerHTML = `<p>No ${category} added yet.</p>`
        return
      }

      items.forEach((item) => {
        const itemElement = document.createElement("div")
        itemElement.className = "menu-item-card"
        itemElement.innerHTML = `
                    <div class="menu-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <div class="menu-item-price">${item.price}</div>
                    <div class="menu-item-actions">
                        <button class="edit-btn" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                        <button class="delete-btn" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `

        listElement.appendChild(itemElement)
      })

      // Add event listeners for edit and delete buttons
      listElement.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          deleteMenuItem(category, id)
        })
      })

      listElement.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          editMenuItem(category, id)
        })
      })
    }
  })
}

function getDefaultMenuItems(category) {
  const defaults = {
    cocktails: [
      {
        id: 1,
        name: "Tropical Sunset",
        price: "$12",
        description: "Rum, pineapple juice, orange juice, grenadine, topped with a cherry",
      },
      {
        id: 2,
        name: "Island Breeze",
        price: "$14",
        description: "Vodka, coconut cream, lime juice, blue curaçao, served over crushed ice",
      },
      {
        id: 3,
        name: "Mango Tango",
        price: "$13",
        description: "Tequila, mango puree, lime juice, agave nectar, with a tajin rim",
      },
    ],
    beers: [
      { id: 1, name: "Island Lager", price: "$7", description: "Crisp, refreshing lager with subtle tropical notes" },
      {
        id: 2,
        name: "Coconut Porter",
        price: "$8",
        description: "Rich, dark porter with hints of coconut and chocolate",
      },
    ],
    wines: [
      {
        id: 1,
        name: "Tropical Chardonnay",
        price: "$10 / $38",
        description: "Notes of pineapple, vanilla, and a hint of oak",
      },
      {
        id: 2,
        name: "Sunset Rosé",
        price: "$9 / $34",
        description: "Bright, fruity rosé with strawberry and watermelon notes",
      },
    ],
    snacks: [
      {
        id: 1,
        name: "Coconut Shrimp",
        price: "$14",
        description: "Crispy coconut-crusted shrimp with mango dipping sauce",
      },
      {
        id: 2,
        name: "Tropical Nachos",
        price: "$12",
        description: "Tortilla chips topped with cheese, pineapple salsa, and avocado",
      },
    ],
  }

  // Save defaults to localStorage
  localStorage.setItem(
    `seasons${category.charAt(0).toUpperCase() + category.slice(1)}`,
    JSON.stringify(defaults[category]),
  )

  return defaults[category]
}

function addMenuItem(category, item) {
  const items = JSON.parse(localStorage.getItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`)) || []

  const newItem = {
    id: Date.now(),
    name: item.name,
    price: item.price,
    description: item.description,
  }

  items.push(newItem)
  localStorage.setItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`, JSON.stringify(items))

  loadMenuItems()
  updateDashboardStats()
}

function deleteMenuItem(category, id) {
  if (confirm("Are you sure you want to delete this item?")) {
    let items = JSON.parse(localStorage.getItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`)) || []

    items = items.filter((item) => item.id != id)
    localStorage.setItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`, JSON.stringify(items))

    loadMenuItems()
    updateDashboardStats()
  }
}

function editMenuItem(category, id) {
  const items = JSON.parse(localStorage.getItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`)) || []
  const item = items.find((item) => item.id == id)

  if (item) {
    const newName = prompt("Enter new name:", item.name)
    if (newName === null) return

    const newPrice = prompt("Enter new price:", item.price)
    if (newPrice === null) return

    const newDescription = prompt("Enter new description:", item.description)
    if (newDescription === null) return

    item.name = newName
    item.price = newPrice
    item.description = newDescription

    localStorage.setItem(`seasons${category.charAt(0).toUpperCase() + category.slice(1)}`, JSON.stringify(items))

    loadMenuItems()
  }
}

// Gallery Functions
function loadGalleryImages() {
  const galleryGrid = document.getElementById("admin-gallery-grid")
  if (!galleryGrid) return

  const images = JSON.parse(localStorage.getItem("seasonsGalleryImages")) || getDefaultGalleryImages()

  galleryGrid.innerHTML = ""

  if (images.length === 0) {
    galleryGrid.innerHTML = "<p>No gallery images added yet.</p>"
    return
  }

  images.forEach((image) => {
    const imageElement = document.createElement("div")
    imageElement.className = "gallery-item"
    imageElement.innerHTML = `
            <img src="${image.src}" alt="${image.title}">
            <div class="gallery-item-overlay">
                <div class="gallery-item-actions">
                    <button class="delete-gallery-btn" data-id="${image.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `

    galleryGrid.appendChild(imageElement)
  })

  // Add event listeners for delete buttons
  galleryGrid.querySelectorAll(".delete-gallery-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      deleteGalleryImage(id)
    })
  })
}

function getDefaultGalleryImages() {
  const defaults = [
    {
      id: 1,
      title: "Bar Interior",
      description: "Cozy Atmosphere",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Foto%20Ekstra1.jpg-PZLQArc46NEY11GRovEw0PHoIeFTHO.jpeg",
    },
    {
      id: 2,
      title: "Craft Cocktails",
      description: "Savor our signature mixes",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Craft%20Cocktails.jpg-DN1lR2hEGHA8HCceg9dBqcId8x8nK8.jpeg",
    },
    {
      id: 3,
      title: "Tropical Interior",
      description: "Relax in our green oasis",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Ambienti.jpg-wlQKDSvvpjfE9IIdJdHxQjZH0wpUcr.jpeg",
    },
    {
      id: 4,
      title: "Our Team",
      description: "Expert mixologists at your service",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Staff.jpg-Yv3Lx4lA2XvVRZY00wDqXLr1l7S17S.jpeg",
    },
    {
      id: 5,
      title: "Comfortable Seating",
      description: "Perfect for friends and gatherings",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Seasons%20Foto%20Ekstra1.jpg-PZLQArc46NEY11GRovEw0PHoIeFTHO.jpeg",
    },
  ]

  localStorage.setItem("seasonsGalleryImages", JSON.stringify(defaults))

  return defaults
}

function addGalleryImage(image) {
  const images = JSON.parse(localStorage.getItem("seasonsGalleryImages")) || []

  images.push(image)
  localStorage.setItem("seasonsGalleryImages", JSON.stringify(images))

  loadGalleryImages()
  updateDashboardStats()
}

function deleteGalleryImage(id) {
  if (confirm("Are you sure you want to delete this image?")) {
    let images = JSON.parse(localStorage.getItem("seasonsGalleryImages")) || []

    images = images.filter((image) => image.id != id)
    localStorage.setItem("seasonsGalleryImages", JSON.stringify(images))

    loadGalleryImages()
    updateDashboardStats()
  }
}

// Events Functions
function loadEvents() {
  const eventsList = document.getElementById("events-list")
  if (!eventsList) return

  const events = JSON.parse(localStorage.getItem("seasonsEvents")) || getDefaultEvents()

  eventsList.innerHTML = ""

  if (events.length === 0) {
    eventsList.innerHTML = "<p>No events added yet.</p>"
    return
  }

  events.forEach((event) => {
    const eventElement = document.createElement("div")
    eventElement.className = "event-card"
    eventElement.innerHTML = `
            <div class="event-info">
                <h4>${event.title}</h4>
                <div class="event-date">${formatDate(event.date)} at ${event.time}</div>
                <p>${event.description}</p>
            </div>
            <div class="event-actions">
                <button class="edit-btn" data-id="${event.id}"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${event.id}"><i class="fas fa-trash"></i></button>
            </div>
        `

    eventsList.appendChild(eventElement)
  })

  // Add event listeners for edit and delete buttons
  eventsList.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      deleteEvent(id)
    })
  })

  eventsList.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      editEvent(id)
    })
  })
}

function getDefaultEvents() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const defaults = [
    {
      id: 1,
      title: "Live Music Night",
      date: formatDateForInput(today),
      time: "20:00",
      description: "Join us for a night of live music featuring local artists.",
    },
    {
      id: 2,
      title: "Cocktail Masterclass",
      date: formatDateForInput(tomorrow),
      time: "18:00",
      description: "Learn how to make our signature cocktails with our expert bartenders.",
    },
  ]

  localStorage.setItem("seasonsEvents", JSON.stringify(defaults))

  return defaults
}

function addEvent(event) {
  const events = JSON.parse(localStorage.getItem("seasonsEvents")) || []

  events.push(event)
  localStorage.setItem("seasonsEvents", JSON.stringify(events))

  loadEvents()
  updateDashboardStats()
}

function deleteEvent(id) {
  if (confirm("Are you sure you want to delete this event?")) {
    let events = JSON.parse(localStorage.getItem("seasonsEvents")) || []

    events = events.filter((event) => event.id != id)
    localStorage.setItem("seasonsEvents", JSON.stringify(events))

    loadEvents()
    updateDashboardStats()
  }
}

function editEvent(id) {
  const events = JSON.parse(localStorage.getItem("seasonsEvents")) || []
  const event = events.find((event) => event.id == id)

  if (event) {
    const newTitle = prompt("Enter new title:", event.title)
    if (newTitle === null) return

    const newDate = prompt("Enter new date (YYYY-MM-DD):", event.date)
    if (newDate === null) return

    const newTime = prompt("Enter new time (HH:MM):", event.time)
    if (newTime === null) return

    const newDescription = prompt("Enter new description:", event.description)
    if (newDescription === null) return

    event.title = newTitle
    event.date = newDate
    event.time = newTime
    event.description = newDescription

    localStorage.setItem("seasonsEvents", JSON.stringify(events))

    loadEvents()
  }
}

// Helper Functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function formatDateForInput(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function updateDashboardStats() {
  const menuCount = document.getElementById("menu-count")
  const imageCount = document.getElementById("image-count")
  const eventCount = document.getElementById("event-count")

  if (menuCount) {
    const cocktails = JSON.parse(localStorage.getItem("seasonsCocktails")) || []
    const beers = JSON.parse(localStorage.getItem("seasonsBeers")) || []
    const wines = JSON.parse(localStorage.getItem("seasonsWines")) || []
    const snacks = JSON.parse(localStorage.getItem("seasonsSnacks")) || []

    const totalMenuItems = cocktails.length + beers.length + wines.length + snacks.length
    menuCount.textContent = totalMenuItems
  }

  if (imageCount) {
    const images = JSON.parse(localStorage.getItem("seasonsGalleryImages")) || []
    imageCount.textContent = images.length
  }

  if (eventCount) {
    const events = JSON.parse(localStorage.getItem("seasonsEvents")) || []
    eventCount.textContent = events.length
  }
}

