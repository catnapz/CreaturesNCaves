using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CreaturesNCaves.EntityFramework.Models
{
    public partial class cncContext : DbContext
    {
        public cncContext()
        {
        }

        public cncContext(DbContextOptions<cncContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Campaigns> Campaigns { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Campaigns>(entity =>
            {
                entity.HasKey(e => e.CampaignId)
                    .HasName("campaign_id");

                entity.ToTable("campaigns");

                entity.Property(e => e.CampaignId)
                    .HasColumnName("campaign_id")
                    .HasMaxLength(256);

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(1024);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(256);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id")
                    .HasMaxLength(256);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Campaigns)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("users_user_id_fkey");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("users_pkey");

                entity.ToTable("users");

                entity.HasComment("Collection of users");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .HasMaxLength(256);

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(1024);

                entity.Property(e => e.HashedPassword)
                    .IsRequired()
                    .HasColumnName("hashed_password")
                    .HasMaxLength(128)
                    .IsFixedLength();

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(256);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasMaxLength(32);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
