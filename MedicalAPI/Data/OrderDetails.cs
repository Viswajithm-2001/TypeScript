using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 
namespace MedicalAPI.Data
{
    [Table("orderDetails", Schema = "public")]
    public class OrderDetails
    {
        [Key]//helps to denote the primary key of database
        public int OrderID { get; set; }
        public int MedicineID { get; set; }
        public string MedicineName {get;set;}
        public int Quantity {get;set;}
        public double Price {get;set;}
        public string OrderStatus {get;set;}
    }
}