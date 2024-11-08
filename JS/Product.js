const API_URL ='https://product.wamasolution.com'

const product_list =document.getElementById('product-list')

let page_num= 1
let page_size = 2
let order_by ='id'
let order_direction ="desc"
let search_query =''


async function fetch_products(page_num, page_size , order_by ,order_direction ,search_query) {
 try{
const response = await fetch(`${API_URL}/api/products?page_num=${page_num}&page_size=${page_size}&order_by=${order_by}&order_direction=${order_direction}&search_query=${search_query}`)

//Get Data-------------------------------------------
const {data,current_page ,from,to,last_page} = await response.json()
display_product(data)
display_pagination(current_page,from, to, last_page)
//console.log(data)
 } catch(error){
 	console.log('Error' , error)
 }
 }

 function display_product(products){
 	product_list.innerHTML =''
 	products?.forEach(item=>(
    product_list.innerHTML +=`

    <div class="product">
    <img src="${API_URL}/${item?.image}" />
    <div class="content">
    <h3> Name : ${item?.name}</h3>
    <p> Description :${item?.description}</p>
    <p>price : $ ${item ?.price} - <del>${+item?.price+ +item?.discount}</del></p>
     <p> Quantity :${item?.quantity}</p>
    </div>
    <!--<button class="btn-trash" onkeypress=""> Delete</button>-->
    </div>
    ` ))
 }

 function display_pagination ( current_page ,from , to , last_page){
   const pagination =document.getElementById('pagination')
   pagination.innerHTML=''
   pagination.innerHTML=`
    <button onclick="prov_Page()" ${current_page===1 && 'disabled'} > Previous </button>
    <span>${from} - ${to}</span>
    <button onclick="next_Page()" ${current_page===last_page && 'disabled'} > Next </button>
   `

 }
 function prov_Page(){
 page_num --
 fetch_products(page_num, page_size , order_by ,order_direction ,search_query)

 }

 function next_Page(){
page_num++
fetch_products(page_num, page_size , order_by ,order_direction ,search_query)
 }

 // change page size------------------------------

 function change_page(value){
   page_size = value
   fetch_products(page_num, page_size , order_by ,order_direction ,search_query)
 }

 // Sort------------------------

 function orderBy(value){
   order_by =value
    fetch_products(page_num, page_size , order_by ,order_direction ,search_query)

 }

  function orderDirection(value){
   order_direction =value
    fetch_products(page_num, page_size , order_by ,order_direction ,search_query)

 }

 function search(value ,event){
   if (event.key==='Enter') {
      event.preventDefault()
      search_query = value.trim()
         fetch_products(page_num, page_size , order_by ,order_direction ,search_query)


   }
   
 }

 fetch_products(page_num, page_size , order_by ,order_direction ,search_query)