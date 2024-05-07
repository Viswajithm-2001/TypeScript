using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 

namespace MedicalAPI.Data
{
    [Table("medicineDetails", Schema = "public")]
    public class MedicineDetails
    {
        [Key]//only for Primary key
        public int MedicineID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public double MedicinePrice {get;set;}
        public DateTime ExpiryDate {get;set;}
    }
}