using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace MetroCardAPI.Data
{
    [Table("userDetails", Schema="public")]
    public class UserDetails
    {
        [Key]
        public int CardID{get; set;}
        public string UserName {get; set;}
        public string EmailID{get; set;}
        public string Password{get;set;}
        public long PhoneNumber{get;set;}
        public double Balance{get; set;}
    }
}