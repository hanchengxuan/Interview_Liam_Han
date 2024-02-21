import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ColDef as AgColDef, GridOptions } from 'ag-grid-community';
import { Column, GridOption } from 'angular-slickgrid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'int-app';

  // agGrid
  transList: any[] = [];
  accountList: any[] = [];
  // associate transacation and account data, put them in dataList
  dataList: any[] = [];
  agGridOptions: GridOptions;

  // SlickGrid
  columnDefinitions: Column[] = [];
  slickGridOptions: GridOption = {};

  // column definations for agGrid
  colDefs: AgColDef[] = [
    { field: 'direction' },
    { field: 'description' },
    { field: 'account.name', headerName: 'Account Name' },
    { field: '_quantity._actualQuantity._amount', headerName: 'Amount' }, 
    { field: '_quantity._actualQuantity._precision', headerName: 'Precision' },
    { field: '_quantity._actualQuantity._symbol', headerName: 'Symbol' },
    { field: '_quantity._currency', headerName: 'Currency' },
    { field: '_transactionDate', headerName: 'Transaction Date' },
    { field: 'category' },
    { field: 'classifications', headerName: 'Classification' }
  ];

  // column definations for SlickGrid
  prepareGrid() {
    this.columnDefinitions = [
      { id: 'direction', name: 'Direction', field: 'direction' },
      { id: 'description', name: 'Description', field: 'description' },
      { id: 'accn', name: 'Account Name', field: 'account.name', sortable: true },
      { id: 'amount', name: 'Amount', field: '_quantity._actualQuantity._amount', sortable: true },
      { id: 'precision', name: 'Precision', field: '_quantity._actualQuantity._precision', sortable: true },
      { id: 'symbol', name: 'Symbol', field: '_quantity._actualQuantity._symbol' },
      { id: 'currency', name: 'Currency', field: '_quantity._currency' },
      { id: 'date', name: 'Transaction Date', field: '_transactionDate', sortable: true },
      { id: 'category', name: 'Category', field: 'category' },
      { id: 'classifications', name: 'Classification', field: 'classifications' },
    ];

    // enable resize and sorting
    this.slickGridOptions = {
      enableAutoResize: true,
      enableSorting: true
    };
}

  // inject httpclient and get slickgrid column definations
  constructor(private http: HttpClient) {
    this.prepareGrid();
    this.agGridOptions = <GridOptions>{
      defaultColDef: {
        sortable: true,
        filter: true,
        pagination: true
      },
    };
   }

  ngOnInit(): void {
    this.getTransactions();
    this.getAccounts();
  }

  // get transaction data from source
  getTransactions() {
    this.http.get<any[]>('https://raw.githubusercontent.com/a-tremblay/grid-poc/master/data/transactions.json')
      .subscribe(res => {
        this.transList = res;
        this.mergeData();
      });
  }

  // get account data from source
  getAccounts() {
    this.http.get<any[]>('https://raw.githubusercontent.com/a-tremblay/grid-poc/master/data/accounts.json')
      .subscribe(res => {
        this.accountList = res;
        this.mergeData();
      });
  }

  mergeData() {
    if (this.transList.length > 0 && this.accountList.length > 0) {
      this.dataList = this.transList.map(transaction => {
        const account = this.accountList.find(acc => acc._id === transaction.accountId);
        return { ...transaction, account };
      });
    }
  }

  // formatClassifications(params: any) {
  //   if (params.value && params.value.length > 0) {
  //     return params.value.join(', ');
  //   }
  //   return '';
  // }


  // gridOptions: GridOptions;
  // rowData: any[];

  // constructor(private dataAssociationService: DataAssociationService) {
  //   this.gridOptions = <GridOptions>{
  //     defaultColDef: {
  //       sortable: true,
  //       filter: true,
  //     },
  //   };
  //   this.rowData = Array.from(this.dataAssociationService.getDataMap().values());
  // }

  // columnDefs = [
  //   { headerName: 'Transaction ID', field: '_id' },
  //   { headerName: 'Direction', field: 'direction' },
  //   { headerName: 'Description', field: 'description' },
  //   { headerName: 'Account Name', field: 'account.name' },
  //   { headerName: 'Amount', field: '_quantity._actualQuantity._amount' },
  //   { headerName: 'Precision', field: '_quantity._actualQuantity._precision' },
  //   { headerName: 'Symbol', field: '_quantity._actualQuantity._symbol' },
  //   { headerName: 'Transaction Date', field: '_transactionDate' },
  //   { headerName: 'Category', field: 'category' },
  //   { headerName: 'Classification', field: 'classifications' } // Assuming only one classification for simplicity
  // ];
  
}
