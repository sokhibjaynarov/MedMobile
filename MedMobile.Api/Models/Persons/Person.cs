// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MedMobile.Api.Models.Persons
{
    public class Person
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid PersonId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string FatherName { get; set; }

        public string PasportNumber { get; set; }

        public string Number { get; set; }

        public string Email { get; set; }


        public virtual User Users { get; set; }
    }
}
