using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class DatabaseContext : ApiAuthorizationDbContext<User>
    {
        public DatabaseContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<Campaign> Campaigns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Campaign>(entity =>
            {
                entity.HasKey(e => e.CampaignId)
                    .HasName("id");

                entity.HasKey(e => e.UserId)
                    .HasName("user_id");

                entity.ToTable("campaigns");

                entity.Property(e => e.CampaignId)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Campaigns)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("campaigns_users_user_id_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                
                entity.Property(e => e.Name).HasColumnName("Name");

                entity.Property(e => e.Description).HasColumnName("Description");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
