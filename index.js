const navContainer = document.querySelector(".nav-container")

function openMenu() {
  navContainer.setAttribute("data-menu", "open")
}

function closeMenu() {
  navContainer.setAttribute("data-menu", "closed")
}

function addToCart(productID) {
  const cart = addedProducts()
  cart.push(productID.toString())
  sessionStorage.setItem("cart", JSON.stringify(cart))
}

function removeFromCart(productID) {
  const cart = addedProducts()
  const index = cart.indexOf(productID)
  cart.splice(index, 1)
  sessionStorage.setItem("cart", JSON.stringify(cart))
}

function productExist(productID) {
  const cart = addedProducts()
  return cart.includes(productID.toString())
}

function addedProducts() {
  let cart = sessionStorage.getItem("cart")
  if (cart == null) {
    cart = []
  } else {
    cart = JSON.parse(cart)
  }
  return cart
}

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".product-container")

  fetch("/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        if (productContainer == null) return
        const productCard = document.createElement("div")
        productCard.classList.add("product-card", "product")

        const productImage = document.createElement("img")
        productImage.src = product.image
        productImage.alt = product.name

        const productContent = document.createElement("div")
        productContent.classList.add("product-content")

        const productTitle = document.createElement("p")
        productTitle.classList.add("product-title")
        productTitle.textContent = product.name

        const productPrice = document.createElement("p")
        productPrice.textContent = product.price

        const productDescription = document.createElement("p")
        productDescription.classList.add("product-description")
        productDescription.textContent = product.description

        const buttonGroup = document.createElement("div")
        buttonGroup.classList.add("button-group")

        const addButton = document.createElement("button")
        addButton.classList.add(
          "button",
          "bg-black",
          "product-button",
          "add-button"
        )
        addButton.setAttribute("data-id", product.id)
        addButton.textContent = productExist(product.id)
          ? "Remove from cart"
          : "Add to cart"

        addButton.addEventListener("click", () => {
          const productID = addButton.getAttribute("data-id")
          if (productID == null) return

          if (productExist(productID)) {
            removeFromCart(productID)
            addButton.textContent = "Add to cart"
            return
          }

          addToCart(productID)
          addButton.textContent = "Remove from cart"
        })

        const reviewsButton = document.createElement("button")
        reviewsButton.classList.add("button", "bg-white", "product-button")
        reviewsButton.textContent = "Benefits"

        productCard.appendChild(productImage)
        productContent.appendChild(productTitle)
        productContent.appendChild(productPrice)
        productContent.appendChild(productDescription)
        buttonGroup.appendChild(addButton)
        buttonGroup.appendChild(reviewsButton)
        productContent.appendChild(buttonGroup)

        productCard.appendChild(productContent)
        productContainer.appendChild(productCard)
      })
    })
    .catch((error) => {
      console.error("Error:", error)
    })
})
