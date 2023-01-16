      window.onload = async function getProduct(){
         console.log('function called')
          //fetch product from database 
      const getResponseObj = await fetch('/getProduct');
      const getProductBody = await getResponseObj.json()
      const product = getProductBody;
      console.log(product)

      if(product.length===0){
              item_list.append('No Product Found');
       } else{ 
              for (let i=0;i<product.length;i++){ 
                const product_name = product[i].product_name;
                const descrip = product[i].description;
                const imgUrl = product[i].imgUrl;
                const product_price = product[i].price; 
                const product_id = product[i]._id;


      const update_item = document.getElementById('update_item');

       const newDiv = document.createElement('div');
             newDiv.classList.add('card');

       const u_list = document.createElement('ul'); 
            u_list.className = 'list-group list-group-flush'

       const product_img = document.createElement('img');
             product_img.classList.add('img-thumbnail');
             product_img.setAttribute("src",imgUrl);

       const list_0 = document.createElement('li');
             list_0.classList.add('list-group-item');

       const list_1 = document.createElement('li');
             list_1.classList.add('list-group-item')
             list_1.innerText = `Product ID:${product_id} `

       const list_2 = document.createElement('li');
             list_2.classList.add('list-group-item');
             list_2.innerText = `Product Name: ${product_name}`

       const list_3 = document.createElement('li');
        list_3.classList.add('list-group-item')
      list_3.innerText = `Price: ${product_price}`
      
       const update_delete_div = document.createElement('div');
      update_delete_div.classList.add('del_upd_itm');

       const updateBtn = document.createElement('i');
        updateBtn.className = 'bi bi-pencil-square';

      const deleteBtn = document.createElement('i'); 
      deleteBtn.className = 'bi bi-x-square';




      newDiv.append(update_delete_div);
      update_delete_div.append(updateBtn);
      update_delete_div.append(deleteBtn) ;
      update_item.append(newDiv);
      newDiv.append(u_list);
      list_0.append(product_img);
      u_list.append(list_0);
      u_list.append(list_1);
      u_list.append(list_2);
      u_list.append(list_3);
      

      }
       }
        }

