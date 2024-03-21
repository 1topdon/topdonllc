document.addEventListener("DOMContentLoaded", () => {
  const emptyCart = document.querySelector(".empty-cart")

  if (emptyCart) {
    if (
      sessionStorage.getItem("cart") == null ||
      sessionStorage.getItem("cart") == "[]"
    ) {
      emptyCart.classList.remove("hidden")
      return
    }

    const cartMenu = document.querySelector(".cart-menu")
    cartMenu.classList.remove("hidden")
    emptyCart.classList.add("hidden")
    const cart = JSON.parse(sessionStorage.getItem("cart"))
    const products = document.querySelector(".products")
    const totalPrice = document.querySelector("#total-price")
    let total = 0

    const table = document.createElement("table")
    table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
    `

    products.appendChild(table)

    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        cart.forEach((item) => {
          const productDetail = data[item - 1]
          total += productDetail.price
          const tr = document.createElement("tr")
          tr.innerHTML = `
        <td>${productDetail.name}</td>
        <td>${productDetail.description}</td>
        <td>${productDetail.price}</td>
        `
          table.appendChild(tr)

          table.innerHTML += `
        </tbody>
        </table>
        `
        })

        totalPrice.textContent = total
      })
  }
})
