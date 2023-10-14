// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Models.Persons;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System;
using MedMobile.Api.Brokers.StorageBrokers;

namespace MedMobile.Api.Services.Persons
{
    public class PersonService : IPersonService
    {
        private readonly IStorageBroker storageBroker;

        public PersonService(IStorageBroker storageBroker)
        {
            this.storageBroker = storageBroker;
        }

        private delegate ValueTask<Person> ReturningPersonFunction();
        private delegate IQueryable<Person> ReturningPersonsFunction();

        private async ValueTask<Person> TryCatch(ReturningPersonFunction returningPersonFunction)
        {
            try
            {
                return await returningPersonFunction();
            }
            catch (Exception ex)
            {
                throw new NotImplementedException();
            }
        }

        private IQueryable<Person> TryCatch(ReturningPersonsFunction returningPersonsFunction)
        {
            try
            {
                return returningPersonsFunction();
            }
            catch (SqlException sqlException)
            {
                throw new NotImplementedException();
            }
        }

        public ValueTask<Person> AddPersonAsync(Person person) =>
        TryCatch(async () =>
        {
            return await this.storageBroker.InsertPersonAsync(person);
        });


        public ValueTask<Person> ModifyPersonAsync(Person person) =>
            TryCatch(async () =>
            {
                Person maybePerson =
                    await this.storageBroker.SelectPersonByIdAsync(person.PersonId);
                return await storageBroker.UpdatePersonAsync(person);
            });


        public ValueTask<Person> RemovePersonByIdAsync(Guid personId) =>
            TryCatch(async () =>
            {
                Person maybePerson =
                await this.storageBroker.SelectPersonByIdAsync(personId);

                return await storageBroker.DeletePersonAsync(maybePerson);
            });

        public IQueryable<Person> RetrieveAllPersons() =>
            TryCatch(() =>
                 this.storageBroker.SelectAllPersons());

        public ValueTask<Person> RetrievePersonByIdAsync(Guid personId) =>
            TryCatch(async () =>
            {
                Person maybePerson =
                    await storageBroker.SelectPersonByIdAsync(personId);
                return maybePerson;
            });
    }
}
