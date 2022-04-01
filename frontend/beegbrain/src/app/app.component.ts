import { Component } from '@angular/core';
// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";  
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'BEEGBRAIN';

  generatePDF() {  

    let document = {  
      header: 'EEG Report',  
      table: {
				body: [
					['Operator', 'Doctor', 'Patient'],
					['Rachel Solando', 'Alice Torres', 'Andrew Laedis']
				]
			},
      content: 
      [
        'The patient has Alzheimer\'s, since the report demonstrated X, Y and Z.'  ,
      ],
    };  
   
    pdfMake.createPdf(document).open();  
  }  
}
