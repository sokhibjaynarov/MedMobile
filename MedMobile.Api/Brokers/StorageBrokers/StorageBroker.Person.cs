// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Persons;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MedMobile.Api.Brokers.StorageBrokers
{
    public partial class StorageBroker
    {
        public DbSet<Person> Persons { get; set; }
        public async ValueTask<Person> InsertPersonAsync(Person person) =>
            await InsertAsync(person);

        public IQueryable<Person> SelectAllPersons() =>
            SelectAll<Person>();

        public async ValueTask<Person> SelectPersonByIdAsync(Guid personId) =>
            await SelectAsync<Person>(personId);

        public async ValueTask<Person> UpdatePersonAsync(Person person) =>
            await UpdateAsync<Person>(person);

        public async ValueTask<Person> DeletePersonAsync(Person person) =>
            await DeleteAsync<Person>(person);
    }
}
