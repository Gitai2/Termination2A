import logging
import azure.functions as func
import pymssql
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("UpdateTofesTiulim_Termination2A triggered.")

    try:
        body = req.get_json()
        email = body.get("EmployeeEmail")
        hr = body.get("HRSignature")
        manager = body.get("ManagerSignature")

        if not email:
            return func.HttpResponse("Missing EmployeeEmail", status_code=400)

        conn = pymssql.connect(
            server=os.environ["SQL_SERVER"],
            user=os.environ["SQL_USER"],
            password=os.environ["SQL_PASSWORD"],
            database=os.environ["SQL_DATABASE"]
        )
        cursor = conn.cursor()
        cursor.execute("""
            EXEC sp_UpdateTofesTiulim_Termination2A 
                @EmployeeEmail=%s, 
                @HRSignature=%s, 
                @ManagerSignature=%s
        """, (email, hr, manager))
        conn.commit()
        conn.close()

        return func.HttpResponse("Updated", status_code=200)

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)
