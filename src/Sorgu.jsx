import './App.css';
import React, { useState, useEffect} from 'react'
import Quagga from 'quagga';
import {BiBarcodeReader} from 'react-icons/bi'
import axios from 'axios';



const Sorgu = () => {

  

   
   const  [barcode, setBarcode] = useState("-");
   const  [urunadi, setUrunadi] = useState("-");
   const  [urunrenk, setUrunrenk] = useState("-");
   const  [urunbarkod, setUrunbarkod] = useState("-");
   const  [beden, setBeden] = useState("-");
   const  [merkez, setMerkez] = useState("-");
   const  [magaza, setMagaza] = useState("-");
   const  [sezon, setSezon] = useState("-");
   
 








    const openCam = () =>{
        Quagga.init({
          numOfWorkers: 0,
            inputStream : {
              name : "Live",
              type : "LiveStream",
              target: document.querySelector('#camera')    
            },
            decoder : {
              readers : ["ean_reader"]
            }
          }, function(err) {
              if (err) {
                  console.log(err);
                  return
              }
              console.log("Initialization finished. Ready to start");
              Quagga.start();
          });
        
        
          Quagga.onDetected(function(data)
          {

            console.log(data);
            if(data) {
                setBarcode(data.codeResult.code)
                console.log(barcode)
                
                const json = {
                    barcode: data.codeResult.code.toString()
                    }
        
                    axios.post("https://aartiurunsorguv1.onrender.com/api/getBarcodev2", json).then(response => {
                        console.log(response);
                      if (response.data){
                        setUrunadi(response.data.UrunAdi);
                        setUrunbarkod(response.data.Barcode);
                        setUrunrenk(response.data.RenkAdi);
                        setBeden(response.data.Beden)
                        setMerkez(response.data.Merkez)
                            setMagaza(response.data.Magaza)
                            setSezon(response.data.Sezon)
                        setUyari("")
                      }else{
                        setUyari("Ürün Veritabanında Bulunamadı!")
                        setUrunadi("-");
                        setUrunbarkod("-");
                        setUrunrenk("-");
                        setBeden("-")
                            setMerkez("-")
                            setMagaza("-")
                            setSezon("-")
                        
                      }
                      
                    
        
                    }).catch(error => {
                        console.log("hata olustu");
                        
                    })
            }
            //  document.querySelector('#barcode').innerHTML = data.codeResult.code;
          })
          


        
    }


        
        
       

            const [uyari, setUyari] = useState("");
            

            const kiyasla = () =>{ 
               
                    setBarcode(message)
                    const json = {
                        barcode: message.toString()
                        }
                        axios.post("https://aartiurunsorguv1.onrender.com/api/getBarcodev2", json).then(response => {
                            console.log(response);
                          if (response.data){
                            setUrunadi(response.data.UrunAdi);
                            setUrunbarkod(response.data.Barcode);
                            setUrunrenk(response.data.RenkAdi);
                            setBeden(response.data.Beden)
                            setMerkez(response.data.Merkez)
                            setMagaza(response.data.Magaza)
                            setSezon(response.data.Sezon)
                            setUyari("")
                          } else{
                            setUyari("Ürün Veritabanında Bulunamadı!")
                            setUrunadi("-");
                            setUrunbarkod("-");
                            setUrunrenk("-");
                            setBeden("-")
                            setMerkez("-")
                            setMagaza("-")
                            setSezon("-")
                            
                          }
            
                        }).catch(error => {
                            console.log("hata olustu");
                            
                        })
                     
                    
                
        }

        const [message, setMessage] = useState('');

        const handleChange = (event) => {
            setMessage(event.target.value);
        
            console.log('Input değeri : ', event.target.value);
        };

        

    return (
        
        <div className="row">
            <div className='col-6 col-s-9'>


                <div className='aside'>
        
                
                    <h2>Ürün:</h2>
                    <input type="text" name="input" placeholder='Barkod No Giriniz...' value={message} onChange={handleChange} required >
                    </input>
                    &nbsp; &nbsp; 
                    <button className='btn' type="button" onClick={kiyasla}>
                        Sorgula
                    </button>
                    &nbsp; &nbsp; &nbsp;<br/><br/>
                  
                    <button onClick={openCam} type="button" className='btn'>
                        Kamera ile Sorgula <BiBarcodeReader/>
                    </button>
                    &nbsp; &nbsp; &nbsp;
                    

                   
        

                </div>
                    
                    <div >
                        <br/>
                     {/* <div className='sonuc'>
                         <h3>Okunan Barkod:</h3> <h2><i>{barcode}</i></h2><br/> 
                        
                        
                       </div> */}

                       
                           
                           
                              {/* <u> <h3>Ürün Bilgileri </h3> </u>
                             Ürün adı: <b><i>{urunadi}</i> </b> <br/>
                             Ürün barkodu: <b><i>{urunbarkod}</i></b> <br/>  
                             Ürün renk: <b><i>{urunrenk}</i> </b><br/> 
                             <b><i>{uyari}</i> </b> */}
                            <div >
                              <table >
                              <caption><h3>Ürün Bilgileri</h3></caption>
                              <thead>
                                <tr>
                                  <th scope="col">Ürün Adı</th>
                                  <th scope="col">Barkod</th>
                                  <th scope="col">Renk</th>
                                  <th scope="col">Beden</th>
                                  <th scope="col">Merkez Envanter</th>
                                  <th scope="col">Mağaza Envanter</th>
                                  <th scope="col">Sezon Envanter</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td data-label="Ürün Adı">{urunadi}</td>
                                  <td data-label="Barkod">{urunbarkod}</td>
                                  <td data-label="Renk">{urunrenk}</td>
                                  <td data-label="Beden">{beden}</td>
                                  <td data-label="Merkez Envanter">{merkez}</td>
                                  <td data-label="Mağaza Envanter">{magaza}</td>
                                  <td data-label="Sezon Envanter">{sezon}</td>
                                  

                                </tr>
                                </tbody>
                                

                                <tfoot>
                                  <tr>
                                    <th colSpan= "7"><i>{uyari}</i></th>
                                  </tr>
                                </tfoot>
                                
                              </table>
                           </div>

                           <br/>
                        
                         <button className='btn' type="button" >
                        Diğer Bedenleri Göster
                          </button> 
                          <br/>
                  
                        
                   
                        <br/>
                        <div className="camera">
                    <div id='camera'>
                    <div id="reader" width="600px"></div>
                    </div>
                        

                    </div>

                   
                    </div>
                    
                </div>



                </div>    
            

    
    );
}

export default Sorgu;
