using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NewSarkariExam.Models;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;


namespace NewSarkariExam.DataAccess.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Job>()
            //   .HasMany<PostLinks>(g => g.ImportantLinks)
            //   .WithOne(l => l.Job);

            //modelBuilder.Entity<Job>()
            //  .HasMany<ImportantDates>(g => g.ImportantDates)
            //  .WithOne(l => l.Job);

            //modelBuilder.Entity<Job>()
            //   .HasOne<Category>(g => g.Category)
            //   .WithMany(j => j.Jobs)
            //   .HasForeignKey(el=>el.CategoryId);
            // modelBuilder.Entity<Job>()
            //.HasOne<Category>(s => s.Category)
            //.WithMany(g => g.Jobs)
            //.HasForeignKey(s => s.CategoryId);
        }
        public DbSet<Category> Category { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<PostLinks> PostLinks { get; set; }
        public DbSet<Result> Results { get; set; }
        public DbSet<ImportantDates> ImportantDates { get; set; }
    }
    // fix for design time applicationdbcontext error 
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Integrated Security=true;Database=NSE_DB;Trusted_Connection=True;MultipleActiveResultSets=true");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
