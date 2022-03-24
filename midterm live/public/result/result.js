getData()
async function getData(){
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data){
    const root =document.createElement('div');
    const image = document.createElement('img');
    const image2 = document.createElement('img');

    image.src = item.image64;
    image2.src = item.image128;
    root.append(image,image2);
    document.body.append(root);
  }
  console.log(data);
}

