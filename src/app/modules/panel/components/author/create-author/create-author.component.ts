import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Book } from '../../book/model/book';
import { AuthorService } from '../service/author.service';
const tableName = 'Author';
@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {
  //books: Book[] = [];
  //ddlBook = "";

  form: any = {
    name: null,
    surName: null,
    slug: null //,
    //bookId: []
  };
  
  isAuthorAdded = false;
  constructor(private authorService: AuthorService, private router: Router) { 
   // this.GetBookList();
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    debugger
    const data = {
      name: this.form.name,
      surName: this.form.surName,
      slug: this.form.slug,
    };
    if (!data.name) {
      alert('Please add Author name!');
      return;
    }
    debugger
    this.authorService.create(data).subscribe(() => { debugger
         console.log('Author created successfully!');
         this.router.navigateByUrl('panel/author');
    })
  }

  onCancel(): void {
    this.router.navigateByUrl('panel/author');
  }
  // GetBookList(){ debugger
  //   this.authorService.getAll("Book")
  //     .subscribe(res => { debugger
  //         this.books = res;
  //         console.log(res);
  //       },
  //       err => { 
  //         console.log(err);
  //       });
  // }
}
