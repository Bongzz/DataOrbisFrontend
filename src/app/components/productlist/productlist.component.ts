import { Product } from './../../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'lodash';

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
  displayedColumns: string[] = ['ProductsID', 'ProductCode', 'ProductDescriptionOriginal', 'ProductDescription', 'ProductCategory', 'ProductStatus', 'ProductBarcode', 'Rowchecksum', 'actions'];
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator | any;

  isEditMode = false;

  constructor(private httpDataService: HttpDataService) {
    this.productData = {} as Product;
  }

  ngOnInit(): void {
    // Initializing Datatable pagination
    this.dataSource.paginator = this.paginator;

    // Fetch All Students on Page load
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
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.productForm.resetForm();
  }

  deleteProduct(productId: number): void {
    this.httpDataService.deleteItem(productId).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.filter((o: any) => {
        return o.ProductsID !== productId ? o : false;
      });

      console.log(this.dataSource.data);

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()
    });
  }

  addProduct(): void {
    this.httpDataService.createItem(this.productData).subscribe((response: any) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = this.dataSource.data.map(o => {
        return o;
      });
    });
  }

  updateProduct(): void {
    this.httpDataService.updateItem(this.productData.ProductsID, this.productData).subscribe((response: any) => {

      // Approach #1 to update datatable data on local itself without fetching new data from server
      this.dataSource.data = this.dataSource.data.map((o: any) => {
        if (o.ProductsID === response.ProductsID) {
          o = response;
        }
        return o;
      });

      // Approach #2 to re-call getAllStudents() to fetch updated data
      // this.getAllStudents()

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

}
