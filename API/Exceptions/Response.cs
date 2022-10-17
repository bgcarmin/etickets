using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Exceptions
{
    public class Response
    {
        public Response(int status, string message = null)
        {
            StatusCode = status;
            Message = message ?? DefaultMessage(status);
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string DefaultMessage(int status)
        {
            string MessageForNumber;

            switch (status)
            {
                case 400:
                    MessageForNumber = "You have made bad request";
                    break;
                case 401:
                    MessageForNumber = "You are not authorized";
                    break;
                case 404:
                    MessageForNumber = "Resource not found";
                    break;
                case 500:
                    MessageForNumber = "Internal server error";
                    break;
                default:
                    MessageForNumber = null;
                    break;
            }

            return MessageForNumber;
        }

    }
}