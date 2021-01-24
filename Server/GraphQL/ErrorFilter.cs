using System;
using System.Net;
using HotChocolate;
using Npgsql;

namespace CreaturesNCaves.Server.GraphQL
{
    public class ErrorFilter : IErrorFilter
    {
        public IError OnError(IError error)
        {
            // Database Exceptions
            if (error.Exception is PostgresException postgresException)
            {
                error = error.WithMessage(
                    postgresException.MessageText + "\n" + postgresException.Detail
                );
            }

            // TODO: Add Proper Logging
            Console.Error.WriteLineAsync
            (
                "Error:\n" +
                $"  Message: {error.Message}\n" +
                $"  Details: {error.Exception?.Message}\n" +
                $"  Path: {error.Path}\n" +
                $"  Code: {error.Code}"
            );

            // Auth Errors
            switch (error?.Code)
            {
                case ErrorCodes.Authentication.NotAuthorized:
                    return GetReturnError(error, HttpStatusCode.Unauthorized, "You shall not pass.");
                case ErrorCodes.Authentication.NotAuthenticated:
                    return GetReturnError(error, HttpStatusCode.Forbidden, "Who are you?");
            }

            return GetReturnError(error, HttpStatusCode.InternalServerError, "Server Error");
        }

        private IError GetReturnError(IError error, HttpStatusCode code, string message)
        {
            return error
                .RemoveException()
                .RemoveExtensions()
                .RemoveLocations()
                .RemovePath()
                .WithCode(code.ToString())
                .WithMessage(message);
        }
    }
}