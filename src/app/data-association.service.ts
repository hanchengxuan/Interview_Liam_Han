import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DataAssociationService {
  transactions: any[];
  accounts: any[];
  dataMap: Map<string, any>;

  constructor(private dataService: DataService) {
    this.dataService.getTransactions().subscribe((data) => {
      this.transactions = data;
      this.associateData();
    });
    this.dataService.getAccounts().subscribe((data) => {
      this.accounts = data;
      this.associateData();
    });
    this.dataMap = new Map<string, any>();
  }

  associateData(): void {
    if (this.transactions && this.accounts) {
      this.transactions.forEach((transaction) => {
        const account = this.accounts.find((acc) => acc._id === transaction.accountId);
        if (account) {
          this.dataMap.set(transaction._id, { ...transaction, account });
        }
      });
    }
  }

  getDataMap(): Map<string, any> {
    return this.dataMap;
  }
}
