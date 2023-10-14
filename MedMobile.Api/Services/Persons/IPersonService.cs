// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Persons;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace MedMobile.Api.Services.Persons
{
    public interface IPersonService
    {
        ValueTask<Person> AddPersonAsync(Person person);
        IQueryable<Person> RetrieveAllPersons();
        ValueTask<Person> RetrievePersonByIdAsync(Guid personId);
        ValueTask<Person> ModifyPersonAsync(Person person);
        ValueTask<Person> RemovePersonByIdAsync(Guid personId);
    }
}
