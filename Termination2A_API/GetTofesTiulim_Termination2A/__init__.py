import logging
import azure.functions as func
import pymssql
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetTofesTiulim_Termination2A triggered.")

    try:
        req_body = req.get_json()
        email = req_body.get("EmployeeEmail")

        if not email:
            return func.HttpResponse("Missing EmployeeEmail", status_code=400)

        conn = pymssql.connect(
            server=os.environ["SQL_SERVER"],
            user=os.environ["SQL_USER"],
            password=os.environ["SQL_PASSWORD"],
            database=os.environ["SQL_DATABASE"]
        )
        cursor = conn.cursor(as_dict=True)
        cursor.execute("EXEC sp_GetTofesTiulim_Termination2A @EmployeeEmail = %s", (email,))
        row = cursor.fetchone()
        conn.close()

        if row:
            return func.HttpResponse(json.dumps(row, default=str), mimetype="application/json")
        else:
            return func.HttpResponse("Not found", status_code=404)

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)
