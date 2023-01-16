
//  add product on lick add button 
let count = 1;
function addBtn(){
 
  const addItem = document.getElementById('addItem');
     count++
      console.log(count)
        if (count % 2 == 0){
            addItem.style.display = 'block';
    } else {
            addItem.style.display = 'none';
    }
}


async function addProduct(){
    const product_name = document.getElementById('title').value
     const description = document.getElementById('description').value
     const price = document.getElementById('price').value 
     const imgUrl = document.getElementById('img').value
     const addProductResponseObj = await fetch('/addProduct',{
         method:'POST',
         headers: {
             'Content-Type': 'application/json',
         },
//  //it will help to convert string into  json string (by default any object browser converted into string) 
         body: JSON.stringify({  
            product_name,
            description,
             price:Number(price),
             imgUrl
         })
        
     })
     const addProductStatus = await addProductResponseObj.json();
     console.log(addProductStatus)
      //it will help to get the actual data part by part
     console.log(addProductResponseObj);
     if(addProductStatus.status==='success') {
         alert('Product Added Successfully');
        //  window.location = '/success.html'
     } else {
         alert('Error Adding Product');
     }
 }


//====================get product==========================

 window.onload = async function getProducts(){
    console.log('hello')
    // e.preventDefault();
    const item_list = document.getElementById('item_list');
    const target = document.getElementById('target');

    const getResponseObj = await fetch('/getProduct')
    // console.log(getResponseObj)
    const getProductBody = await getResponseObj.json()
    console.log(getProductBody)
    
    
    

    // console.log(getProductBody.allProducts[0].name)
    const product = getProductBody
    console.log(product)
    
    if(product.length===0){
        item_list.append('No Product Found');
    } else {
        for (let i=0;i<product.length;i++){
            const product_name = product[i].product_name;
            const descrip = product[i].description;
            const imgUrl = product[i].imgUrl;
            const newPrice = product[i].price;

            const delBtn = document.getElementsByClassName('bi-x-square')
            const cardDescription = document.getElementById('card_description')
            const productInput = document.getElementById('Image')
            const button = document.getElementById('btn') 


    const newCard = document.createElement('div')
    newCard.classList.add('card')
    const newImage = document.createElement('img')
    newImage.classList.add('img-thumbnail')
    newImage.setAttribute("src", imgUrl);
    const price = document.createElement('span')
    price.classList.add('price')
    price.innerText = `₹ ${newPrice}`
    const cart_price = document.createElement('div')
    cart_price.classList.add('cart_price')
    const newInnerDiv = document.createElement('div')
    newInnerDiv.classList.add('card-body')
    const h5 = document.createElement('h5')
    h5.classList.add('card-title')
    h5.innerText = product_name;
    const pTag = document.createElement('span');
    pTag.classList.add('d-block')
    pTag.innerText = descrip
    const anchorTag = document.createElement('a')
    anchorTag.className ='btn btn-outline-success cart'
    anchorTag.innerText = `ADD TO CART`

            let plus = 0;
    anchorTag.addEventListener("click",()=>{
        
        // const product_img = a[0].currentSrc
        const product_img = document.querySelector('.img-thumbnail');
        const product_name = document.querySelector('.card-title').innerText
        const product_descrp = document.querySelector('.d-block').innerText
        const price = document.querySelector('.price').innerText

        const card = document.createElement('div')


    })



      
 


    
    target.append(newCard)    
    
    newCard.append(newImage)
    newCard.append(newInnerDiv)
    newInnerDiv.append(h5)
    newInnerDiv.append(pTag)
    cart_price.append(anchorTag);
    cart_price.append(price);
    newInnerDiv.append(cart_price)
        }
    }
}
    
