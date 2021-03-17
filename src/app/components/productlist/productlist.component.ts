import { Product } from './../../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import * as _ from 'lodash';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})

export class ProductlistComponent implements OnInit {

  @ViewChild('productForm', { static: false })
  productForm: NgForm | any;
  productData: Product;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'ProductCode', 'ProductDescriptionOriginal', 'ProductDescription', 'ProductCategory', 'ProductStatus', 'ProductBarcode', 'Rowchecksum', 'actions'];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | any;

  isEditMode = false;


  constructor(private httpDataService: HttpDataService, public dialog: MatDialog) {
    this.productData = {} as Product;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;

    this.getAllProducts();
  }
  getAllProducts(): void {
    this.httpDataService.getList().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }

  editProduct(element: any): void {
    this.productData = _.cloneDeep(element);
    this.isEditMode = true;
    this.openDialog(element);
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.productForm.resetForm();
  }

  deleteProduct(productId: number): void {
    this.httpDataService.deleteItem(productId).subscribe((response: any) => {

      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        console.log(o);
        return o.id !== productId ? o : false;
      });
    });
  }

  addProduct(): void {
    this.isEditMode = false;
    this.openDialog({});
  }

  updateProduct(): void {
    this.httpDataService.updateItem(this.productData.id, this.productData).subscribe((response: any) => {

      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });

      this.cancelEdit();

    });
  }

  onSubmit(): void {
    if (this.productForm.form.valid) {
      if (this.isEditMode) {
        this.updateProduct();
      }
      else {
        this.addProduct();
      }
    } else {
      console.log('Enter valid data!');
    }
  }

  openDialog(product: any): void {
    
    const dialogRef = this.dialog.open(EditComponent, {
      width: '700px',
      data: {
        isEdit: this.isEditMode,
        product: product
      }
    });
  }

}
