using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<T> where T : BaseEntity
    {
        public static IQueryable<T> GetQuery(IQueryable<T> q, ISpecification<T> specification)
        {
            var query = q;

            // ukoliko postoji kriterij dodaje se u query
            if(specification.Criteria != null)
            {
                query = query.Where(specification.Criteria);
            }

            // ukoliko postoji kriterij za sortiranje dodaje se u query
            if(specification.OrderBy != null)
            {
                query = query.OrderBy(specification.OrderBy);
            }

            if(specification.OrderByDescending != null)
            {
                query = query.OrderByDescending(specification.OrderByDescending);
            }

            // ako je paging omogucen dodaje se skip i take 
            if(specification.PagingEnabledFlag)
            {
                query = query.Skip(specification.Skip).Take(specification.Take);
            }

            // dodaju se includes na query
            query = specification.Includes.Aggregate(query, (q, include) => q.Include(include));

            return query;
        }
    }
}