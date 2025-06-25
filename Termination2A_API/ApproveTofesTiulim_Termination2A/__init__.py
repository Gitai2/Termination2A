import logging
import azure.functions as func
import pymssql
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("ApproveTofesTiulim_Termination2A triggered.")

    try:
        data = req.get_json()
        email = data.get("EmployeeEmail")
        role = data.get("ApproverRole")  # Must be 'HR' or 'Manager'

        if not email or not role:
            return func.HttpResponse("Missing fields", status_code=400)

        if role not in ["HR", "Manager"]:
            return func.HttpResponse("Invalid ApproverRole", status_code=400)

        conn = pymssql.connect(
            server=os.environ["SQL_SERVER"],
            user=os.environ["SQL_USER"],
            password=os.environ["SQL_PASSWORD"],
            database=os.environ["SQL_DATABASE"]
        )
        cursor = conn.cursor()
        cursor.execute("""
            EXEC sp_ApproveTofesTiulim_Termination2A 
                @EmployeeEmail = %s, 
                @ApproverRole = %s
        """, (email, role))
        conn.commit()
        conn.close()

        return func.HttpResponse("Approval recorded", status_code=200)

    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)
