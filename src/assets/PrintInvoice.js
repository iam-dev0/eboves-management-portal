import dayjs from 'dayjs';
import logo from '@/assets/black-logo.png';

const PrintInvoice = (order = {}) => {
  let html = '';
  html += `<div class="container print_invoice_div " >
     <style type="text/css">
    h1, h2, h3, h4, h5, h6{
    font-weight: 600;
    }
    .print_invoice_div, .cn_genrations{
        page-break-before: always;
    }
    .heading-panel{
      padding-top: 10px;
    }
    .heading-panel-sub{
    text-align: center;
    }
    .left{
    float: left;
    }
    .right{
    float: right;
    }
    .name-invoice{
    padding: 0px 0px 10px 0px;
    }
    .company-deatils{
    text-align: center;
    width: 80%;
    margin: 0 auto;
    padding-bottom: 0px;
    }
    .underline{
    font-weight: 600;
    font-size: 16px;
    text-decoration: underline;
    display: inline-block;
    }
    .table td{
    padding: .4rem; 
    }
    .table td h4{
    display: inline-block; 
    }
    .table td h5{
    margin-bottom: 0px;
    display: inline-block;
    }
    .table tr td:nth-child(2){
    text-align: right;
    }
    .last-td{
    text-align: right;
    }
    .atrate{
    padding-right: 40px;
    }
    .column-2 span{
    float: left;
    font-weight: 600;
    }
    .column-2 div{
    padding-left: 40px;
    float: left;
    }
    .column-2 div span{
    font-weight: 500; 
    }
    .column-2 div h5{ 
    margin: 0px; 
     }
    </style>
    <div class="heading-panel">
    <div class="heading-panel-sub">
    <img src="${logo}" width="150px">
    <h4>Shop online</h4>
    <h6>@www.eboves.com</h6>
    </div>
    <p class="name-invoice"><span class="left">
    ${order.shippingInfo.firstName + (order.shippingInfo.lastName || '')} 
    </span><span class="right"><b>Phone</b>:
    ${order.shippingInfo.phone}
    </span></p>
    <p class="name-invoice"><span class="left"><b>Address</b>: 
    ${order.shippingInfo.address} , ${order.shippingCharges.city?.name} 
     </span></p>
    <p class="name-invoice"><span class="left"><b>Invoice# 
    ${order.orderNumber}
    </b></span><span class="right"><img src="https://aodour.app/assets/barcode.php?text=${
      order.orderNumber
    } width="150" alt="Trax" /></span></p>
    <small>Placed at: 
    ${dayjs(order.createdAt).format('DD-MM-YYYY HH:mm:ss')}
     | Eboves Online Store</small><br>
    ${dayjs().format('DD-MM-YYYY HH:mm:ss')} 
    </small>
    </div>
    <table class="table">
    <thead>
    <tr>
    <th><h5 class="mt-2">Items</h5></th>
    <th><h5 class="mt-2 ml-1">Qty</h5></th>
    <th></th>
    <th></th>
    </tr>
    </thead>`;

  order.products.forEach((order_product_variation) => {
    html += `
     <tr>
        <td class="">
            <div > 
            <p style="max-width: 500px; margin-bottom:0px !important;" >
                ${order_product_variation.name}
            </p>
            <small>
                <u>
                    <b>
                        ${order_product_variation.supplierCode || ''} 
                    </b>
                        ${order_product_variation.sku}
                </u>    
            </small>
                ${
                  order_product_variation.discountedPercentage > 0
                    ? `
                    <br>
                    <small>
                    ${order_product_variation.discountedPercentage} % | PKRs ${
                        order_product_variation.sellingPrice /
                          (1 - order_product_variation.discountedPercentage / 100) -
                        order_product_variation.sellingPrice
                      } OFF 
                    </small>`
                    : ''
                }
            </div>
        </td>
        <td>
            <span class="atrate text-center"> 
            ${order_product_variation.quantity}
            </span>
        </td>
        <td>
            <span class="atrate text-center">
              @PKRs ${order_product_variation.sellingPrice}  
            </span>
        </td>
        <td class="text-right column-2">
            <h5 class=" text-right"> 
                PKRs ${order_product_variation.sellingPrice * order_product_variation.quantity} 
            </h5>
            <br>
            ${
              order_product_variation.discountedPercentage > 0
                ? `
                <h6 class=" text-right">
                    <strike>  
                        PKRs ${
                          (order_product_variation.quantity *
                            order_product_variation.sellingPrice) /
                          (1 - order_product_variation.discountedPercentage / 100)
                        } 
                    </strike>
                </h6>`
                : ''
            }
        </td>
    </tr>
        `;
  });

  html += `<tr>
        <td class="column-2">
            <small class="bold">Courier Charges</small>
        </td>
        <td class=" text-right">
            <small class="atrate  text-right bold"></small>
        </td>
        <td class=" text-right">
            <small class="atrate  text-right bold">@PKRs  
            ${order.shippingCharges}
            </small>
        </td>
        <td class=" text-right ">
            <small class=" text-right bold"> 
                PKRs ${order.shippingCharges}
            </small>
        </td>
    </tr>
    <tr>
        <td class="column-2">
            <small class="bold">GST</small>
        </td>
        <td class="column-2">
            <small class="bold"></small>
        </td>
        <td class=" text-right">
            <small class="atrate  text-right bold">
                @PKRs ${order.tax || 0}
            </small>
        </td>
        <td class=" text-right ">
            <small class=" text-right bold"> 
                PKRs ${order.tax || 0} 
            </small>
        </td>
    </tr>
    <tr>
        <td class="column-2">
            <small class="bold">Discount Amount</small>
        </td>
        <td class="column-2">
            <small class="bold"></small>
        </td>
        <td class=" text-right">
            <small class="atrate  text-right bold">
                @PKRs ${order.discountedAmount} 
            </small>
        </td>
        <td class=" text-right ">
            <small class=" text-right bold"> 
                PKRs ${order.discountedAmount} 
            </small>
        </td>
    </tr>
    <tr>
        <td class=" text-left" colspan="2">
            <h4>TOTAL</h4>  (${order.products.length} ) 
        </td>
        <td>
        </td>
        <td class="text-right">
            <h4>
                ${order.amount + order.shippingCharges} 
            </h4>
        </td>
    </tr>`;

  //   if (order.discountedPercentage || order.discountedAmount) {
  //     html += `<tr>
  //         <td class=" text-left" colspan="2">Savings</td>
  //         <td class=" text-right">
  //             ${
  //               order.discountedPercentage
  //                 ? `${order.discountedPercentage} % `
  //                 : `PKR  ${order.discountedAmount}`
  //             }
  //         </td>
  //     </tr>
  //     <tr>
  //         <td class=" text-left" colspan="2">Courier Payment</td>
  //         <td class=" text-right">
  //             ${order.amount}
  //         </td>
  //     </tr>`;
  //   }

  html += `</tbody>
    </table>
    <div class="company-deatils">
    <p class="underline">Complaints Hotline:</p> +923408704981
    </div>
    </div>`;

  html = `
    <html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Eboves Invoice</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    </head>
    <body>
    ${html} 
    </body>
    </html>`;

  return html;
};

export default PrintInvoice;
