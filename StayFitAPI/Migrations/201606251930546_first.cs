namespace StayFitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class first : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Schedules", "ApplicationUserID", "dbo.AspNetUsers");
            DropIndex("dbo.Schedules", new[] { "ApplicationUserID" });
            DropPrimaryKey("dbo.Schedules");
            AddColumn("dbo.Schedules", "ID", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Schedules", "ApplicationUserID", c => c.String(maxLength: 128));
            AddPrimaryKey("dbo.Schedules", "ID");
            CreateIndex("dbo.Schedules", "ApplicationUserID");
            AddForeignKey("dbo.Schedules", "ApplicationUserID", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Schedules", "ApplicationUserID", "dbo.AspNetUsers");
            DropIndex("dbo.Schedules", new[] { "ApplicationUserID" });
            DropPrimaryKey("dbo.Schedules");
            AlterColumn("dbo.Schedules", "ApplicationUserID", c => c.String(nullable: false, maxLength: 128));
            DropColumn("dbo.Schedules", "ID");
            AddPrimaryKey("dbo.Schedules", new[] { "ApplicationUserID", "ExerciseID" });
            CreateIndex("dbo.Schedules", "ApplicationUserID");
            AddForeignKey("dbo.Schedules", "ApplicationUserID", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
