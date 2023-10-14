// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Persons;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial interface IStorageBroker
    {
        ValueTask<Person> InsertPersonAsync(Person person);
        IQueryable<Person> SelectAllPersons();
        ValueTask<Person> SelectPersonByIdAsync(Guid personId);
        ValueTask<Person> UpdatePersonAsync(Person person);
        ValueTask<Person> DeletePersonAsync(Person person);
    }
}
