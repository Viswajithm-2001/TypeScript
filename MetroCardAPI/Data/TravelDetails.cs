using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MetroCardAPI.Data
{
    [Table("travelDetails", Schema = "public")]
    public class TravelDetails
    {
        [Key]
        public int TravelID{get; set;}
        public int CardID{get; set;}
        public string FromLocation{get; set;}
        public string ToLocation{get; set;}
        public DateTime TravelDate{get; set;}
        public double TravelCost{get; set;}
    }
}