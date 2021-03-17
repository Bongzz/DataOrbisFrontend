import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent {
  product = {
    id: 0,
    ProductCode: '',
    ProductDescriptionOriginal: '',
    ProductDescription: '',
    ProductCategory: '',
    ProductStatus: '',
    ProductBarcode: '',
    Rowchecksum: ''
  };
  isEdit = false;
  constructor(private httpDataService: HttpDataService,
              public dialogRef: MatDialogRef<EditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    const { isEdit, product } = this.data;
    this.isEdit = isEdit;
    if (this.isEdit) {
      this.product = product;
    }
   }

   onCancelClick(): void {
    this.dialogRef.close();
  }

  addOrEditProduct(): void {
    if (this.isEdit){
      this.httpDataService.updateItem(this.product.id, this.product);
    } else {
        
        const newProduct = {
        ProductCode :  this.product.ProductCode,
        ProductDescriptionOriginal :  this.product.ProductDescriptionOriginal,
        ProductDescription :  this.product.ProductDescription,
        ProductCategory :  this.product.ProductCategory,
        ProductStatus :  this.product.ProductStatus,
        ProductBarcode :  this.product.ProductCode,
        Rowchecksum :  this.product.Rowchecksum};
        this.httpDataService.createItem(newProduct);
    }
    this.dialogRef.close();
  }

}

