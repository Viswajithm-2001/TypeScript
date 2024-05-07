using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 

namespace MedicalAPI.Data
{
    [Table("userDetails", Schema = "public")]
    public class UserDetails
    {
        [Key]
        public int UserID { get; set; }
        public string UserName {get; set;}
        public long UserPhoneNumber { get; set; }
        public string UserMailID {get;set;}
        public string Password {get;set;}
        public double UserBalance { get; set; }
    }
}