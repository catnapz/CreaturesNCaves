using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EntityFramework.Models
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Campaign> Campaigns { get; set; }
        public virtual DbSet<DeviceCodeEntity> DeviceCodes { get; set; }
        public virtual DbSet<PersistedGrant> PersistedGrants { get; set; }
        public virtual DbSet<RoleClaim> RoleClaims { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<UserClaim> UserClaims { get; set; }
        public virtual DbSet<UserLogin> UserLogins { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<UserToken> UserTokens { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Campaign>(entity =>
            {
                entity.HasKey(e => e.CampaignId)
                    .HasName("campaign_id");

                entity.ToTable("campaigns");

                entity.Property(e => e.CampaignId).HasColumnName("campaign_id");

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

            modelBuilder.Entity<DeviceCodeEntity>(entity =>
            {
                entity.HasKey(e => e.UserCode)
                    .HasName("device_codes_pkey");

                entity.ToTable("device_codes");

                entity.HasIndex(e => e.DeviceCode)
                    .HasName("device_codes_device_code_index")
                    .IsUnique();

                entity.HasIndex(e => e.Expiration)
                    .HasName("device_codes_expiration_index");

                entity.Property(e => e.UserCode).HasColumnName("user_code");

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasColumnName("client_id");

                entity.Property(e => e.CreationTime)
                    .IsRequired()
                    .HasColumnName("creation_time");

                entity.Property(e => e.Data)
                    .IsRequired()
                    .HasColumnName("data");

                entity.Property(e => e.DeviceCode)
                    .IsRequired()
                    .HasColumnName("device_code");

                entity.Property(e => e.Expiration)
                    .IsRequired()
                    .HasColumnName("expiration");

                entity.Property(e => e.SubjectId).HasColumnName("subject_id");
            });

            modelBuilder.Entity<PersistedGrant>(entity =>
            {
                entity.HasKey(e => e.Key)
                    .HasName("persisted_grants_pkey");

                entity.ToTable("persisted_grants");

                entity.HasIndex(e => e.Expiration)
                    .HasName("persisted_grants_expiration_index");

                entity.HasIndex(e => new { e.SubjectId, e.ClientId, e.Type })
                    .HasName("persisted_grants_subject_id_client_id_type_index");

                entity.Property(e => e.Key).HasColumnName("key");

                entity.Property(e => e.ClientId)
                    .IsRequired()
                    .HasColumnName("client_id");

                entity.Property(e => e.CreationTime)
                    .IsRequired()
                    .HasColumnName("creation_time");

                entity.Property(e => e.Data)
                    .IsRequired()
                    .HasColumnName("data");

                entity.Property(e => e.Expiration).HasColumnName("expiration");

                entity.Property(e => e.SubjectId).HasColumnName("subject_id");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type");
            });

            modelBuilder.Entity<RoleClaim>(entity =>
            {
                entity.ToTable("role_claims");

                entity.HasIndex(e => e.RoleId)
                    .HasName("role_claims_role_id_index");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClaimType).HasColumnName("claim_type");

                entity.Property(e => e.ClaimValue).HasColumnName("claim_value");

                entity.Property(e => e.RoleId)
                    .IsRequired()
                    .HasColumnName("role_id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.RoleClaims)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("role_claims_roles_role_id_fkey");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.NormalizedName)
                    .HasName("role_name_index")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ConcurrencyStamp).HasColumnName("concurrency_stamp");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.NormalizedName).HasColumnName("normalized_name");
            });

            modelBuilder.Entity<UserClaim>(entity =>
            {
                entity.ToTable("user_claims");

                entity.HasIndex(e => e.UserId)
                    .HasName("user_claims_user_id_index");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClaimType).HasColumnName("claim_type");

                entity.Property(e => e.ClaimValue).HasColumnName("claim_value");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserClaims)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_claims_users_user_id_fkey");
            });

            modelBuilder.Entity<UserLogin>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey })
                    .HasName("user_logins_pkey");

                entity.ToTable("user_logins");

                entity.HasIndex(e => e.UserId)
                    .HasName("user_logins_user_id_index");

                entity.Property(e => e.LoginProvider).HasColumnName("login_provider");

                entity.Property(e => e.ProviderKey).HasColumnName("provider_key");

                entity.Property(e => e.ProviderDisplayName).HasColumnName("provider_display_name");

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserLogins)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_logins_users_user_id_fkey");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId })
                    .HasName("user_roles_pkey");

                entity.ToTable("user_roles");

                entity.HasIndex(e => e.RoleId)
                    .HasName("user_roles_role_id_index");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("user_roles_roles_role_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserRoles)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_roles_users_user_id_fkey");
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name })
                    .HasName("user_tokens_pkey");

                entity.ToTable("user_tokens");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.LoginProvider).HasColumnName("login_provider");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Value).HasColumnName("value");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserTokens)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_tokens_users_user_id_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("email_index");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("user_name_index")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");
                
                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.AccessFailedCount).HasColumnName("access_failed_count");

                entity.Property(e => e.ConcurrencyStamp).HasColumnName("concurrency_stamp");

                entity.Property(e => e.Description).HasColumnName("description");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.EmailConfirmed).HasColumnName("email_confirmed");

                entity.Property(e => e.LockoutEnabled).HasColumnName("lockout_enabled");

                entity.Property(e => e.LockoutEnd).HasColumnName("lockout_end");

                entity.Property(e => e.NormalizedEmail).HasColumnName("normalized_email");

                entity.Property(e => e.NormalizedUserName).HasColumnName("normalized_user_name");

                entity.Property(e => e.PasswordHash).HasColumnName("password_hash");

                entity.Property(e => e.PhoneNumber).HasColumnName("phone_number");

                entity.Property(e => e.PhoneNumberConfirmed).HasColumnName("phone_number_confirmed");

                entity.Property(e => e.SecurityStamp).HasColumnName("security_stamp");

                entity.Property(e => e.TwoFactorEnabled).HasColumnName("two_factor_enabled");

                entity.Property(e => e.UserName).HasColumnName("user_name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
